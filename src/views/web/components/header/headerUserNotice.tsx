import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {useDispatch, useMappedState} from "redux-react-hook";
import {Dropdown, Badge, Tabs, List, Button, Avatar, message, notification} from 'antd';
import {BellOutlined} from '@ant-design/icons';
import webSocket from "../../../../lib/plugins/socket";
import {getUnreadMessageList} from "../../../../store/user/actions";
import {NoticeInfo} from "../../../../types/user";
import {readMessage as fetchReadMessage, clearAllUnreadMessage as fetchClearAllUnreadMessage} from "../../../../service/user";
import {IS_PROD, BASE_SOCKET_URL} from "../../../../conf";

const {TabPane} = Tabs;

const {Group: ButtonGroup} = Button;

const noticeTypeList = {
    10: '评论了你的文章',
    20: '回复了你的评论文章',
    30: '点赞了你的评论文章',
    40: '踩了你的评论文章'
};

const noticeRouterList = {
    10: '/article/',
    20: '/article/',
    30: '/article/',
    40: '/article/'
};

const badgeStyle = {
    minWidth: '10px',
    height: '14px',
    padding: '0 4px',
    lineHeight: '14px',
    borderRadius: '14px'
};

const listTitleStyle = {
    color: 'rgba(0,0,0,.65)',
    fontSize: '14px',
};

const HeaderUserNotice: FC<{userId: number}> = ({userId}: {userId: number}): ReactElement => {

    const history = useHistory();

    const dispatch = useDispatch();

    const messageListState = useCallback(state => state.user.unreadMessageList, ['user.unreadMessageList']);

    const messageList = useMappedState(messageListState);

    const getMessageList = () => {
        dispatch(getUnreadMessageList());
    };

    const startUpWebSocketServer = () => {
        webSocket.connect(BASE_SOCKET_URL, `${IS_PROD ? '/prod' : ''}/notice`);

        webSocket.register('connect', () => {
            // eslint-disable-next-line
            console.log('Socket connected');
            webSocket.socket.emit('joinNoticeRoom', userId);
        });

        webSocket.register('disconnect', () => {
            // eslint-disable-next-line
            console.log('Socket disconnected');
        });

        webSocket.register('error', (msg: string) => {
            // eslint-disable-next-line
            console.log(msg);
        });

        webSocket.register('getNotice', (data: NoticeInfo) => {
            const {sendName, content, title, type} = data;
            getMessageList();
            notification.open({
                message: `${sendName}${noticeTypeList[type]}"${title}"`,
                description: content,
            });
        });
    };

    const [dropVisible, setDropVisible] = useState<boolean>(false);

    useEffect(() => {
        startUpWebSocketServer();
        getMessageList();
        return () => {
            webSocket.disconnect();
        }
    }, []);

    const visibleChangeHandle = (visible: boolean) => {
        setDropVisible(visible);
    };

    const tabTitle = `消息${messageList.length ? `(${messageList.length})` : ''}`;

    const readMessage = ({messageId, type, sourceId}: Pick<NoticeInfo, 'messageId' | 'type' | 'sourceId'>) => {
        (async () => {
            const {flags} = await fetchReadMessage({messageId});
            if (flags === 'success') {
                getMessageList();
                history.push(`${noticeRouterList[type]}${sourceId}`)
            }
        })();
    };

    const clearAllUnreadMessage = () => {
        const messageIdList = messageList.map((notice: NoticeInfo) => notice.messageId);
        if (!messageIdList.length) {
            message.warning('暂无可清空消息');
            return
        }
        (async () => {
            const {flags} = await fetchClearAllUnreadMessage({messageIdList});
            if (flags === 'success') {
                getMessageList();
            }
        })();
    };

    const getNoticeList = ({item, i}: {item: NoticeInfo, i: number}): ReactElement => {
        const {content, createDate, title, type, sourceId, profilePicture, sendName, messageId} = item;
        const titleResult = `${sendName}${noticeTypeList[type]}"${title}"`;
        return (
            <List.Item
              key={`${item.id}_${i}`}
              onClick={() => {readMessage({messageId, type, sourceId})}}
            >
                <List.Item.Meta
                  avatar={<Avatar src={profilePicture} />}
                  title={<span style={listTitleStyle}>{titleResult}</span>}
                  description={
                      (
                          <div>
                              <div>{content}</div>
                              <div>{createDate}</div>
                          </div>
                      )
                  }
                />
            </List.Item>
        )
    };

    const DropDownNotice = (): ReactElement => {
        return (
            <div className="app-header__notice-container">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={tabTitle} key="1">
                        <div className="notice-content">
                            <List
                              dataSource={messageList}
                              renderItem={(item: NoticeInfo, i: number) => getNoticeList({item, i})}
                            />
                        </div>
                        <ButtonGroup>
                            <Button onClick={clearAllUnreadMessage}>清空消息</Button>
                        </ButtonGroup>
                    </TabPane>
                </Tabs>
            </div>
        )
    };

    return (
        <div className="app-header__notice">
            <Dropdown
              placement="bottomRight"
              trigger={['click']}
              visible={dropVisible}
              onVisibleChange={visibleChangeHandle}
              overlay={DropDownNotice}
            >
                <Badge style={badgeStyle} count={messageList.length}>
                    <BellOutlined />
                </Badge>
            </Dropdown>
        </div>
    )
};

export default HeaderUserNotice;
