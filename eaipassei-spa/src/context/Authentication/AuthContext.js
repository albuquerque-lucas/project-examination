import { createContext, useContext, useState, useMemo } from 'react';
import axios from '../../axios';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	
	// set user to local storage
	// const setUser = (user) => {
		// 	if (user) {
			// 		localStorage.setItem('user', JSON.stringify(user));
			// 	} else {
				// 		localStorage.removeItem('user');
				// 	}
				// 	console.log('DE DENTRO DE SETUSER', user);
				// 	_setUser(user);
				// };
				
				// csrf token generation for guest methods
				
				const value = useMemo(() => {
					const setUser = (user) => {
						if (user) {
							localStorage.setItem('user', JSON.stringify(user));
						} else {
							localStorage.removeItem('user');
						}
						_setUser(user);
					};
		return {
			user,
			setUser,
			authenticated,
			setAuthenticated,
		};
	}, [
		user,
		authenticated,
		setAuthenticated,
	]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};