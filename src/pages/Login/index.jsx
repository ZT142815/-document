import * as React from 'react';
import {withRouter} from "react-router";
import './index.less';
import {Form} from 'antd';
import 'antd/es/form/style';
import {Input} from 'antd';
import 'antd/es/input/style';
import {Checkbox} from 'antd';
import 'antd/es/checkbox/style';
import {Button} from 'antd';
import 'antd/es/button/style';
import {message} from 'antd';
import 'antd/es/message/style';
import ScopeContext from "../../Containers/App/context";
import uMApis from "../../apis/userManagementApis";
import {useTranslation} from "react-i18next";

const Login = withRouter((props) => {
    const {t, i18n} = useTranslation();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const [form] = Form.useForm();
    const scope = React.useContext(ScopeContext);

    async function onFinish(values) {
        const {username, password, remember} = values;
        // const res = await uMApis.login(username, password);
        if (username === 'admin' && password === 'admin') {
            props.history.push('/');
            scope.dispatch({
                type:'setLoginInfo',
                loginInfo: {
                    username: 'admin' 
                }
            });
            if (remember) {
                localStorage.setItem('loginSession', 'sjdfdskla;fjis;fjsdklfafdiroajka;fdafsdf');
            }
        }
        // if (res.status === 0) {
        //     props.history.push('/');
        //     scope.dispatch({
        //         type:'setLoginInfo',
        //         loginInfo: {
        //             username: res.data.username
        //         }
        //     });
        //
        //     if (remember) {
        //         localStorage.setItem('loginSession', 'sjdfdskla;fjis;fjsdklfafdiroajka;fdafsdf');
        //     }
        // } else {
        //     message.error('请输入正确的用户名和密码！');
        // }
    }

    function onReset() {
        form.resetFields();
    }

    return (
        <div className='login-bg'>
            <div className='login'>
                <h1>{t('common:Login')}</h1>
                <Form
                    {...layout}
                    form={form}
                    name="basic"
                    className='login-form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住账号</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button onClick={onReset}>重置</Button>
                        <Button type="primary" htmlType="submit" style={{marginLeft: '20px'}}>
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
});

export default Login;
