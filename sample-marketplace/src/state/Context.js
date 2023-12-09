// Context.js
import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
	const [filecoinData, setFilecoinData] = useState({});

	return (
		<Context.Provider value={{ filecoinData, setFilecoinData }}>
			{children}
		</Context.Provider>
	);
};
