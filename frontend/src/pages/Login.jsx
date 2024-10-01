import EnhancedLoginScreen from '../components/Form.jsx';

function Login() {
    return <EnhancedLoginScreen route="/api/token/" method="login" />;
}

export default Login;