import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ContactsForm from "./components/ContactsForm";
import LoginForm from "./components/LoginForm";
import UserForm from "./components/UserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<LoginForm />} />
					<Route path="/contacts" element={<ContactsForm />} />
					<Route path="/register" element={<UserForm />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
}

export default App;
