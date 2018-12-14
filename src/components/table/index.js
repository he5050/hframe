import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Icon, Modal, Table, Dropdown, Menu } from "antd";
import BaseComponent from '../../middleware/base_component';
import HFImage, { EmImgProcessType } from "../image";
import HFFilter, { FilterItemType } from "./filter";

const TabColumnType = {
  Picture: 1, // 图片
  BtnGroup: 2, // 操作按钮组
};

class HFTable extends BaseComponent('HFTable') {
  constructor(props) {
    super(props);
    this.paginationDefault = {
      simple: props.isMobile,
      showTotal: (total, range) => {
        return (`${range[0]}-${range[1]} , 共 ${total} 条记录`);
      },
    };
  }

  render() {
    const { isMobile, pagination, scroll, rowKey = 'id', ...others } = this.props;
    let tableProps = {
      ...others,
      // pagination（false 与 undefined 展示结果是不一致的）
      pagination: pagination ? _.merge(pagination, this.paginationDefault) : pagination,
      columns: this.getColumns(),
      scroll: !scroll ? { x: true } : scroll,
      rowKey: rowKey,
    };

    // 兼容mobx5以下的时候antd3.9.0以上的情况
    if (!Array.isArray(tableProps.dataSource)) {
      tableProps.dataSource = [...tableProps.dataSource];
    }

    return (
      <div className={`u-table-list ${isMobile ? 'wap' : 'web'}`}>
        <Table {...tableProps} />
      </div>
    );
  }

  getColumns = () => {
    const { columns, isMobile } = this.props;
    return _.map(columns, (v) => {
      let n = {
        ...v,
      };

      switch (v.type) {
        case TabColumnType.Picture: {
          // 数据为图片时,增加图片列Column
          n.className = `img-column ${n.className || ''}`;
          n.render = (text) => {
            let imgSize = { height: 40 };
            // 配置图片宽度和高度 如果为空，则默认设置图片高度
            if (v.attribute.width || v.attribute.height) {
              imgSize = {
                width: v.attribute.width,
                height: v.attribute.height,
              };
            }
            return (
              <HFImage
                {...imgSize}
                style={imgSize}
                imageUrl={text}
                aspectRatio={v.attribute.aspectRatio}
                quality={80}
                processType={v.attribute.processType}
                water={false}
              />
            );
          };
          n.onCell = (record) => {
            return {
              onClick: () => {
                Modal.info({
                  iconType: null,
                  width: 'auto',
                  className: "model-large-img",
                  maskClosable: true,
                  okText: "X",
                  content: (
                    <HFImage
                      imageUrl={record[v.key]}
                      width={600}
                      aspectRatio="-1:-1"
                      quality={100}
                      processType={EmImgProcessType.emGD_W_H}
                      water={v.attribute.water}
                    />
                  ),
                });
              },
            };
          };
          break;
        }
        case TabColumnType.BtnGroup: {
          // 设置列默认固定在最右侧
          if (!n.fixed) {
            n.fixed = 'right';
          }
          // 操作列 - 按钮组
          n.className = `action-btn ${n.className || ''}`;
          n.render = (text, record, index) => {
            const newBtnGroup = typeof v.attribute.btnVisible === "function"
            ? v.attribute.btnGroup.filter(btn => v.attribute.btnVisible(record, btn))
            : v.attribute.btnGroup;
            const onClick = v.attribute.onClick;

            if (isMobile && newBtnGroup.length > 1) {
              return (
                <Dropdown
                  trigger={['click']}
                  className="operate-ground-box wap"
                  overlay={
                    <Menu prefixCls="operate-ground-menu">
                      {
                        _.map(newBtnGroup, (vv, kk) => {
                          return (
                            <Menu.Item key={kk}>
                              <a className={vv.className} onClick={() => { onClick && onClick(record, vv, index); }}>{vv.name}</a>
                            </Menu.Item>
                          );
                        })
                      }
                    </Menu>
                  }
                >
                  <a className="ant-dropdown-link" href="#">
                    更多<Icon type="down" />
                  </a>
                </Dropdown>
              );
            }

            return (
              <span className={`operate-ground-box ${isMobile ? 'wap' : 'web'}`}>
                {
                  _.map(newBtnGroup, (vv, kk) => {
                    return (
                      <a key={kk} className={vv.className} onClick={() => { onClick && onClick(record, vv, index); }}>{vv.name}</a>
                    );
                  })
                }
              </span>
            );
          };
          break;
        }
        default: {
          // 默认市text
          // 设置了弹匡显示
          if (n.popShow) {
            n.render = (text) => {
              return <span style={{ cursor: "pointer" }} className="u-line-clamp">{text}</span>;
            };
            n.onCell = (record) => {
              return {
                onClick: () => {
                  Modal.info({
                    title: "明细",
                    content: <pre style={{ whiteSpace: "pre-wrap" }}>{record[n.dataIndex]}</pre>,
                    okText: '确定',
                    maskClosable: true,
                  });
                },
              };
            };
          }
          break;
        }
      }
      return n;
    });
  }
}

// 属性类似ant Table组件
HFTable.propTypes = {
  isMobile: PropTypes.bool,
};

export {
  HFTable as default,
  HFFilter,
  TabColumnType,
  FilterItemType,
};
