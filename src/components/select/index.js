// 样式文件加载
import React from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import { Button, Select } from "antd";
import debounce from "lodash.debounce";
import utils from '../../utils/utils';
import fetchPack from '../../net/fetch';
import BaseComponent from '../../middleware/base_component';

class HFSelect extends BaseComponent('HFSelect') {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state = {
      data: [],
      queryParams: {
        pageIndex: 1,
        pageSize: props.pageSize || 20,
      },
      count: 0,
      fetching: false,
    };
    this.handleSearch = debounce(this.onSearch, 800);
  }

  // 分割url和参数
  splitQueryUrl(props) {
    const { dataUrl } = props;
    let params = {};
    let arrs = dataUrl.split("?");
    if (arrs[1] && arrs[1].length > 0) {
      let ps = arrs[1].split("&");
      // 解析参数
      _.each(ps, (v) => {
        let pa = v.split("=");
        if (pa.length === 2) {
          params[pa[0]] = pa[1];
        }
      });
    }

    // url和参数
    return {
      url: arrs[0],
      queryParams: {
        ...params,
      },
    };
  }

  async fetchData(p, isMore = false, props = this.props) {
    // 如果是不可编辑状态，不去请求搜索列表
    if (props.disabled || this.state.fetching) {
      return;
    }

    // 解析参数
    const { url, queryParams } = this.splitQueryUrl(props);

    // 避免没必要的刷新
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;

    let resp = {};
    try {
      this.setState({ fetching: true });
      resp = await fetchPack.get(utils.buildQueryUrl(url, { ...queryParams, ...p }));
    } catch (error) {
      resp.succ = false;
      console.log(error);
    }
    if (fetchId !== this.lastFetchId) {
      return;
    }

    if (isMore) {
      // 加载更多
      if (!resp.succ) {
        this.setState({ fetching: false });
      } else {
        this.setState({
          data: [...this.state.data, ...resp.data],
          queryParams: { ...p },
          count: resp.count,
          fetching: false,
        });
      }
    } else {
      // 条件搜索
      if (!resp.succ) {
        this.setState({
          fetching: false,
          data: [],
        });
      } else {
        this.setState({
          data: [...resp.data],
          queryParams: { ...p },
          count: resp.count,
          fetching: false,
        });
      }
    }
  }

  // componentWillMount() {
  componentDidMount() {
    this.setState({ data: [] });
    this.fetchData({
        ...this.state.queryParams,
        pageIndex: 1,
      },
      false,
      this.props
    );
  }

  componentWillReceiveProps(nextProps) {
    // 数据url发生变化，或者由不可修改变成可修改的时候
    if ((this.props.dataUrl !== nextProps.dataUrl)
      || (this.props.disabled !== nextProps.disabled && !nextProps.disabled)) {
      this.setState({ data: [] });
      this.fetchData({
          ...this.state.queryParams,
          pageIndex: 1,
        },
        false,
        nextProps
      );
    }
  }

  onSearch = (value) => {
    const { searchKey = 'name' } = this.props;
    let p = { ...this.state.queryParams };
    if (p[searchKey] !== value) {
      p.pageIndex = 1;
    }
    p[searchKey] = value;
    this.fetchData(p);
  }

  onMore = () => {
    if (this.state.fetching) {
      return;
    }
    let p = { ...this.state.queryParams };
    p.pageIndex += 1;
    this.fetchData(p, true);
  }

  handleChange = (v) => {
    this.props.onChange(v);
  }

  render() {
    const { optionValue, mode, showSearch = false, disabled = false, value, allowClear = false, placeholder = '请选择' } = this.props;
    const { data = [], count = 0, fetching } = this.state;

    let label = (
      <div className="more-box" style={data.length >= count ? { display: 'none' } : {}}>
        <Button type="primary" loading={fetching} onClick={this.onMore}>加载更多</Button>
      </div>
    );

    return (
      <Select className={`m-select ${this.props.className || ''}`}
        labelInValue
        value={value}
        mode={mode}
        disabled={disabled}
        filterOption={false}
        allowClear={allowClear}
        showSearch={showSearch}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        placeholder={placeholder}
      >
        <Select.OptGroup label={label}>
          {
            _.map(data, (v, k) => {
              // 通过用户定义的optionValue转化显示
              let tv = optionValue(v);
              return (
                <Select.Option key={k} value={tv.value}>{tv.text}</Select.Option>
              );
            })
          }
        </Select.OptGroup>
      </Select>
    );
  }
}

HFSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  mode: PropTypes.string,
  dataUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  optionValue: PropTypes.func.isRequired,
};

export default HFSelect;
