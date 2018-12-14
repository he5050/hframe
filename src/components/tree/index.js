import React from 'react';
import _ from "lodash";
import { fromJS, is } from "immutable";
import { Tree } from 'antd';
import BaseComponent from '../../middleware/base_component';

class HFTree extends BaseComponent('HFTree') {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
    };
  }

  componentDidMount() {
    let checkedKeys = this.props.checkedKeys;
    // 兼容mobx5以下的时候antd3.9.0以上的情况
    if (!Array.isArray(checkedKeys)) {
      checkedKeys = [...checkedKeys];
    }
    this.setState({ checkedKeys: checkedKeys });
  }

  componentWillReceiveProps(nextProps) {
    let checkedKeys = nextProps.checkedKeys;
    // 兼容mobx5以下的时候antd3.9.0以上的情况
    if (!Array.isArray(checkedKeys)) {
      checkedKeys = [...checkedKeys];
    }
    this.setState({ checkedKeys: checkedKeys });
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
    if (this.props.onChange) {
      this.props.onChange(checkedKeys);
    }
  }

  renderTreeNodes = (data, disabled) => {
    return _.map(data, (v) => {
      if (v.childen) {
        return (
          <Tree.TreeNode title={v.title} key={v.key} disableCheckbox={disabled}>
            {
              this.renderTreeNodes(v.childen, disabled)
            }
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={v.title} key={v.key} disableCheckbox={disabled} />;
    });
  }

  render() {
    const { dataSource = [], disabled = false } = this.props;
    return (
      <Tree checkable
        disabled={disabled}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        checkedKeys={this.state.checkedKeys}
      >
        {
          this.renderTreeNodes(dataSource, false)
        }
      </Tree>
    );
  }
}

export default HFTree;
