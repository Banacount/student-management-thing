import logo from '../assets/logo.svg'
import './LoginMenu.css'

function Logo () {
	return (
		<div className="logo-contain">
			<img src={logo} alt="Student Manager" />
		</div>
	)
}

function LoginMenu () {
	return (
		<>
			<div className="display-contain">
				<div className="login-contain">
					<Logo />

					<form>
						<input type="text" name='username' placeholder='Username' autoComplete='off' />
						<input type="password" name='password' placeholder='Password' autoComplete='off' />
					</form>

					<a href="https://youtu.be/dQw4w9WgXcQ?si=V5uXpNAvSe2mCCJF">No account? Register.</a>
				</div>
			</div>
		</>
	)
}

export default LoginMenu;
