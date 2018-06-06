import React from 'react';
import _ from "lodash";
import { fromJS, is } from "immutable";
import { Cascader } from 'antd';
import utils from '../../utils/utils';
import fetchPack from '../../net/fetch';
import BaseComponent from '../../middleware/base_component';

export default class HFCascader extends BaseComponent('HFCascader') {
  constructor(props, context) {
    super(props, context);
    this.option = {
      pageIndex: 1,
      pageSize: 1000
    };
    this.state = {
      options: []
    };
  }

  onChange = v => {
    // 方便外部获取名称
    this.props.onChange(v);
  }

  componentDidMount() {
    this.cascaderFetch(this.props)
    .then(options => {
      this.setState({ options: options });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!is(fromJS(this.props.value), fromJS(nextProps.value))) {
      this.cascaderFetch(nextProps)
      .then(options => {
        this.setState({ options: options });
      });
    }
  }

  async fetchData(url, p) {
    let resp = {
      succ: false
    };

    try {
      resp = await fetchPack.get(utils.buildQueryUrl(url, { ...p, ...this.option }));
    } catch (error) {
      resp.succ = false;
    }

    return resp;
  }

  async cascaderFetch(props) {
    const { configs = [], value = [] } = props;
    if (configs.length === 0) {
      return [];
    }

    // 当前状态值
    let options = [...this.state.options];

    // 要把value里面的值初始到组件上面，必须把每一级的数据请求下来
    let cLen = configs.length;
    for (let k = 0; k < cLen; k++) {
      let v = configs[k];
      let isLeaf = !(cLen > k + 1);
      let resp = {};
      if (k && value[k - 1]) {
        let f = _.findIndex(options, o => { return o.value === value[k - 1]; });
        if (f > -1) {
          // 找到了父项，判断父项里面有没有叶子节点
          if (options[f].children && options[f].children.length > 0) {
            continue;
          }

          // 请求子几点数据
          resp = await this.fetchData(v.dataUrl, { [configs[k].searchKey]: value[k - 1] });
          options[f] = {
            ...options[f],
            loading: false,
            children: _.map(resp.data, va => {
              return {
                value: va.id,
                label: va.name,
                index: 1,
                isLeaf
              };
            })
          };
        }
      } else if (k === 0) {
        // 已经有值的情况下不做处理
        if (options.length > 0) {
          continue;
        }

        resp = await this.fetchData(v.dataUrl, {});
        options = _.map(resp.data, va => {
          return {
            value: va.id,
            label: va.name,
            index: 1,
            isLeaf
          };
        });
      } else {
        break;
      }
    }

    return options;
  }

  /**
   * {
   *  dataUrl: '',
   *  searchKey: '',
   * }
   */
  loadData = selectedOptions => {
    const { configs = [] } = this.props;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 获取触发的index
    let isLeaf = !(configs.length > targetOption.index + 1);
    let index = targetOption.index + 1;
    targetOption.loading = true;
    // 请求下一级的数据是根据搜索key加上具体的值
    this.fetchData(configs[index - 1].dataUrl, { [configs[index - 1].searchKey]: targetOption.value })
    .then(resp => {
      if (resp.succ) {
        targetOption.loading = false;
        targetOption.children = _.map(resp.data, v => {
          return {
            value: v.id,
            label: v.name,
            index,
            isLeaf
          };
        });
      }
    });
  }

  render() {
    const { disabled = false, value, allowClear = false, placeholder = '请选择', className, style } = this.props;
    return (
      <Cascader
        className={className}
        style={style}
        value={value}
        allowClear={allowClear}
        disabled={disabled}
        placeholder={placeholder}
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}
