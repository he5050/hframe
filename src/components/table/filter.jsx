// 样式文件加载
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
  Radio: 8, // 单选按钮组
};

// 屏幕宽度
const ScreenWidth = {
  XXL: 1600,
  XL: 1200,
  LG: 992,
  MD: 768,
  SM: 576,
  XS: 0,
};

@Form.create()
export default class FilterArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 读取展开状态初始值
      unfold: "unfold" in props ? props.unfold : this.getDefaultUnfold(props),
      // 当前屏幕宽度 尺寸
      screenWidth: undefined
    };
  }

  componentDidMount() {
    this.updateScreenWidth();
    window.addEventListener('resize', this.updateScreenWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenWidth);
  }

  // 更新当前屏幕宽度
  updateScreenWidth = () => {
    let viewWidth = window.innerWidth;
    let screenWidth;
    if (viewWidth >= ScreenWidth.XXL) {
      screenWidth = ScreenWidth.XXL;
    } else if (viewWidth >= ScreenWidth.XL) {
      screenWidth = ScreenWidth.XL;
    } else if (viewWidth >= ScreenWidth.LG) {
      screenWidth = ScreenWidth.LG;
    } else if (viewWidth >= ScreenWidth.MD) {
      screenWidth = ScreenWidth.MD;
    } else if (viewWidth >= ScreenWidth.SM) {
      screenWidth = ScreenWidth.SM;
    } else {
      screenWidth = ScreenWidth.XS;
    }
    if (screenWidth !== this.state.screenWidth) {
      this.setState({ screenWidth: screenWidth });
    }
  }

  // 获取unfold的默认值，
  getDefaultUnfold(props) {
    const { configs = [] } = props;
    for (const v of configs) {
      // 如果筛选条件有默认值， 则默认为展开
      if (v.attribute.initValue) {
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
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
                <Input {...other} />
              )
            }
          </Form.Item>
        );
      }
      // 日期范围
      case FilterItemType.DateRange: {
        const { label, initValue, fieldOptions, extraOptions, ...other } = node.attribute;
        return (
          <Form.Item label={label}>
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
               <DatePicker.RangePicker {...extraOptions} {...other} />
              )
            }
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
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
                <DatePicker {...other} {...extraOptions} />
              )
            }
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
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
                <Select {...other}>
                  {
                    _.map(options, (v, k) => {
                      return (
                        <Select.Option key={k} value={v.value}>
                          {v.name}
                        </Select.Option>
                      );
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
        );
      }
      case FilterItemType.DropDownNet: {
        const { label, initValue, fieldOptions, ...other } = node.attribute;
        return (
          <Form.Item label={label}>
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
                <HFSelect {...other} />
              )
            }
          </Form.Item>
        );
      }
      case FilterItemType.Cascader: {
        const { label, initValue, fieldOptions, ...other } = node.attribute;
        return (
          <Form.Item label={label}>
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
                <HFCascader {...other} />
              )
            }
          </Form.Item>
        );
      }
      case FilterItemType.Radio: {
        const { label, initValue, fieldOptions, options, ...other } = node.attribute;
        return (
          <Form.Item label={label}>
            {
              getFieldDecorator(node.fieldKey, {
                initialValue: initValue,
                ...(fieldOptions || {}),
              })(
                <Radio.Group {...other}>
                  {
                    _.map(options, (v, k) => {
                      return (
                        <Radio key={k} value={`${v.value}`}>
                          {v.name}
                        </Radio>
                      );
                    })
                  }
                </Radio.Group>
              )
            }
          </Form.Item>
        );
      }
      default: {
        break;
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

  // 根据当前浏览器宽度 读取对应的span值
  readSpan(col) {
    switch (this.state.screenWidth) {
      case ScreenWidth.XXL:
        return col.xxl || col.xl || col.lg || col.md || col.sm || col.span;
      case ScreenWidth.XL:
        return col.xl || col.lg || col.md || col.sm || col.span;
      case ScreenWidth.LG:
        return col.lg || col.md || col.sm || col.span;
      case ScreenWidth.MD:
        return col.md || col.sm || col.span;
      case ScreenWidth.SM:
        return col.sm || col.span;
      default:
        return col.xs || col.span;
    }
  }

  dealWith() {
    /**
     * v的数据结构
     * type: FilterItemType的类型
     * weight: 1,2,3 占位权重，1表示个最小的输入条件占位 兼容老版本
     * col: antd网格组件 Col组件属性
     * value: ''
     * keyName: ''
     * attribute: {
     *  label: 名称,
     *  placeholder: 提示
     *  render:()=>{}
     * }
     */
    const { configs = [], gutter = { span: 8, md: 12, lg: 18, xl: 24, xxl: 32 } } = this.props;
    let btnCol = { span: 24, md: 12, lg: 8, xl: 6, xxl: 4 };
    // 多行标记 如果筛选条件没有第二行 则值为-1, 反之表示 multiRow 表示第二行第一个元素的下标
    let multiRowIndex = -1;
    // 计算 multiRowIndex 的值
    let spanSum = 0;
    for (let i = 0; i < configs.length; i++) {
      const v = configs[i];
      if (v.weight) {
        spanSum += Number(v.weight * 8);
      } else {
        spanSum += this.readSpan(v.col);
      }
      if (spanSum > 24) {
        multiRowIndex = i;
        break;
      }
    }

    // 是否是按钮
    let singleRowBtn = false;
    if (multiRowIndex === -1) {
      spanSum += this.readSpan(btnCol);
      if (spanSum <= 24) {
        singleRowBtn = true;
      }
    }
    return (
      <Row type="flex" gutter={gutter} className="one-row">
        {
          _.map(configs, (v, k) => {
            let style = this.state.unfold ? undefined : { display: "none" };
            let col = v.weight ? { span: v.weight * 8 } : v.col;
            return (
              <Col
                key={k}
                style={(multiRowIndex !== -1 && k >= multiRowIndex) ? style : undefined}
                {...col}
              >
                {this.generator(v)}
              </Col>
            );
          })
        }
        <Col className={`filter-col ${singleRowBtn ? 'single-row' : 'multi-row'}`} {...btnCol}>
          <div className="filter-button">
            <span className="button-group">
              <Button type="primary" onClick={this.onFilter}>查询</Button>
              <Button onClick={this.onReset}>重置</Button>
              {
                multiRowIndex !== -1 &&
                <a onClick={this.onSwitchUnfold}>
                  {this.state.unfold ? "折叠" : "展开"}
                  <Icon type={this.state.unfold ? "up" : "down"} />
                </a>
              }
            </span>
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Form className={`u-table-filter ${this.props.className || ""}
        title-length-${this.props.labelLength}`}
        layout="inline"
      >
        {this.dealWith()}
      </Form>
    );
  }
}

FilterArea.defaultProps = {
  // 设置label默认最低宽度 labelLength区域为2-6
  labelLength: 4,
};
