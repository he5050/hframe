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
        pageSize: props.pageSize||20,
      },
      count: 0,
      fetching: false,
      keyId: props.keyId
    };
    this.handleSearch = debounce(this.onSearch, 800);
  }

  async fetchData(p, keyId, isMore = false, nextProps = this.props) {
    // 如果是不可编辑状态，不去请求搜索列表
    if (nextProps.disabled) {
      return;
    }

    // 基于某个keyId选择，不存在的情况下说明父组件还未准备好
    if (p[keyId] === undefined || this.state.fetching) {
      return;
    }

    // 避免没必要的刷新
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;

    this.setState({ fetching: true });
    let resp = {
      succ: false
    };
    try {
      resp = await fetchPack.get(utils.buildQueryUrl(this.props.listUrl, { ...p }));
    } catch (error) {
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

  componentWillMount() {
    this.initData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps);
  }

  initData(nextProps) {
    if (nextProps[nextProps.keyId] === undefined) {
      this.setState({ 
        data: [],
        queryParams:{
          pageIndex: 1,
          pageSize: nextProps.pageSize||20,
        }
      });
    } else if (nextProps[nextProps.keyId] !== this.state.queryParams[nextProps.keyId]) {
      this.setState({ data: []});
      this.fetchData({
        ...this.state.queryParams,
        pageIndex: 1,
        [nextProps.keyId]: nextProps[nextProps.keyId]
      },
        nextProps.keyId,
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
    this.fetchData(p, this.state.keyId);
  }

  onMore = () => {
    if (this.state.fetching) {
      return;
    }
    let p = { ...this.state.queryParams };
    p.pageIndex += 1;
    this.fetchData(p, this.state.keyId, true);
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
      <Select className={`m-select ${ this.props.className || '' }`}
        labelInValue
        value={value}
        mode={mode}
        disabled={disabled}
        filterOption={false}
        allowClear={allowClear}
        showSearch={showSearch}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        placeholder={placeholder}>
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
  keyId: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  mode: PropTypes.string,
  listUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  optionValue: PropTypes.func.isRequired,
};

export default HFSelect;
 