import React, { PureComponent } from "react";
import _ from "lodash";
import { Form, Row, Col, Input, Select, DatePicker, Button, Icon, Radio } from "antd";
import HFSelect from "../select";
import HFCascader from "../cascader";

/**
 * 筛选类型
 */
export const FilterItemType = {
  Custom: 1, // 定制组件
  Search: 2, // 搜索
  DropDown: 3, // 下拉
  DateRange: 4, // 日期范围
  Date: 5, // 日期
  DropDownNet: 6, // 下拉,选项网络加载
  Cascader: 7, // 级连选择框
  Radio: 8 // 单选按钮组
};

@Form.create()
export default class FilterArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 读取展开状态初始值
      unfold: "unfold" in props ? props.unfold : this.getDefaultUnfold(props)
    };
  }

  // 获取unfold的默认值，
  getDefaultUnfold(props) {
    const { configs = [] } = props;
    for (const v of configs) {
      // 如果筛选条件有默认值， 则默认为展开
      if (v.attribute.initValue) {
        console.log("v", v);
        return true;
      }
    }
    return false;
  }

  generator(node) {
    const { getFieldDecorator } = this.props.form;
    switch (node.type) {
      // 定制
      case FilterItemType.Custom: {
        return node.attribute.render(this.props.form);
      }
      // 搜索
      case FilterItemType.Search: {
        const { label, initValue, fieldOptions, ...other } = node.attribute;
        // 查询key的初始值
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(<Input {...other} />)}
          </Form.Item>
        );
      }
      // 日期范围
      case FilterItemType.DateRange: {
        const {
          label,
          initValue,
          fieldOptions,
          extraOptions,
          ...other
        } = node.attribute;
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(<DatePicker.RangePicker {...extraOptions} {...other} />)}
          </Form.Item>
        );
      }
      case FilterItemType.Date: {
        const {
          label,
          initValue,
          fieldOptions,
          extraOptions,
          ...other
        } = node.attribute;
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(<DatePicker {...other} {...extraOptions} />)}
          </Form.Item>
        );
      }
      case FilterItemType.DropDown: {
        const {
          label,
          initValue,
          fieldOptions,
          options,
          ...other
        } = node.attribute;
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(
              <Select {...other}>
                {_.map(options, (v, k) => {
                  return (
                    <Select.Option key={k} value={v.value}>
                      {v.name}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        );
      }
      case FilterItemType.DropDownNet: {
        const { label, initValue, fieldOptions, ...other } = node.attribute;
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(<HFSelect {...other} />)}
          </Form.Item>
        );
      }
      case FilterItemType.Cascader: {
        const { label, initValue, fieldOptions, ...other } = node.attribute;
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(<HFCascader {...other} />)}
          </Form.Item>
        );
      }
      case FilterItemType.Radio: {
        const {
          label,
          initValue,
          fieldOptions,
          options,
          ...other
        } = node.attribute;
        return (
          <Form.Item label={label}>
            {getFieldDecorator(node.fieldKey, {
              initialValue: initValue,
              ...(fieldOptions || {})
            })(
              <Radio.Group {...other}>
                {_.map(options, (v, k) => {
                  return (
                    <Radio key={k} value={`${v.value}`}>
                      {v.name}
                    </Radio>
                  );
                })}
              </Radio.Group>
            )}
          </Form.Item>
        );
      }
    }
  }

  // 筛选
  onFilter = () => {
    this.props.form.validateFields({}, (err, values) => {
      if (!err) {
        this.props.onFilter(values);
      }
    });
  };

  // 重置
  onReset = () => {
    this.props.form.resetFields();
    this.props.onFilter({});
  };

  // 切换是否展开
  onSwitchUnfold = () => {
    let unfold = !this.state.unfold;
    this.setState({ unfold });
  };

  dealWith() {
    /**
     * v的数据结构
     * type: FilterItemType的类型
     * weight: 1,2,3 占位权重，1表示个最小的输入条件占位
     * value: ''
     * keyName: ''
     * attribute: {
     *  label: 名称,
     *  placeholder: 提示
     *  render:()=>{}
     * }
     */
    const { configs = [] } = this.props;

    // 先进行分行
    let rows = [];
    let row = [];
    let weight = 0;
    for (let i = 0; i < configs.length; i++) {
      const v = configs[i];
      // 权重值超过3就需要分行了
      if (weight + v.weight <= 3) {
        weight += v.weight;
        row.push(v);
      } else {
        rows.push([...row]);
        row = [];
        row.push(v);
        weight = v.weight;
      }
    }
    if (row.length > 0) {
      rows.push([...row]);
    }

    // 生成搜索区域内容
    if (rows.length === 1 && weight < 3) {
      let spanSum = 0;
      return (
        <Row gutter={48} className="one-row">
          {_.map(rows[0], (vv, kk) => {
            spanSum += vv.weight * 8;
            return (
              <Col key={kk} span={vv.weight * 8}>
                {this.generator(vv)}
              </Col>
            );
          })}
          <Col key="filter-button" span={24 - spanSum}>
            <div key={"filter-button"} className="filter-button">
              <span className="button-group">
                <Button type="primary" onClick={this.onFilter}>
                  查询
                </Button>
                <Button onClick={this.onReset}>重置</Button>
              </span>
            </div>
          </Col>
        </Row>
      );
    } else {
      let style = this.state.unfold ? undefined : { display: "none" };
      let content = _.map(rows, (v, k) => {
        return (
          <Row key={k} style={k >= 1 ? style : undefined} gutter={48}>
            {_.map(v, (vv, kk) => {
              return (
                <Col key={kk} span={vv.weight * 8}>
                  {this.generator(vv)}
                </Col>
              );
            })}
          </Row>
        );
      });
      content.push(
        <div key={"filter-button"} className="filter-button align-right">
          <span className="button-group">
            <Button type="primary" onClick={this.onFilter}>
              查询
            </Button>
            <Button onClick={this.onReset}>重置</Button>
            {rows.length > 1 && (
              <a onClick={this.onSwitchUnfold}>
                {this.state.unfold ? "折叠" : "展开"}
                <Icon type={this.state.unfold ? "up" : "down"} />
              </a>
            )}
          </span>
        </div>
      );
      return content;
    }
  }

  render() {
    return (
      <Form
        className={`u-table-filter ${this.props.className || ""} title-length-${
          this.props.labelLength
        }`}
        layout="inline"
      >
        {this.dealWith()}
      </Form>
    );
  }
}

FilterArea.defaultProps = {
  // 设置label默认最低宽度 labelLength区域为2-6
  labelLength: 4
};
