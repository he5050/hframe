import React from 'react';
import _ from "lodash";
import { Tree } from 'antd';
import BaseComponent from '../../middleware/base_component';

class HFTree extends BaseComponent('HFTree') {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: this.props.checkedKeys,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checkedKeys: nextProps.checkedKeys });
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
      return <Tree.TreeNode title={v.title} key={v.key} disableCheckbox={disabled}/>;
    });
  }

  render() {
    const { dataSource=[], disabled=false } = this.props;
    return (
      <Tree checkable
        disabled={disabled}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        checkedKeys={this.state.checkedKeys}>
        {
          this.renderTreeNodes(dataSource, false)
        }
      </Tree>
    );
  }
}

export default HFTree;
