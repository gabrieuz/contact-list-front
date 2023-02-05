import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { FormContainer, FormStyle } from "./styles";
import { toast } from "react-toastify";

export interface ILoginFormInput {
	email: string;
	password: string;
}

export default function LoginForm({ setResult }: any) {
	const sucessToast = () => {
		toast.success("Usuário logado com sucesso!");
	};

	const errorToast = () => {
		toast.error("Erro ao fazer login, verifique usuário ou senha!");
	};

	const schema = yup.object({
		email: yup.string().email("E-mail inválido.").required("E-mail obrigatório."),
		password: yup.string().required("Senha obrigatória."),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormInput>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: ILoginFormInput) => {
		api.post("/login", data)
			.then((response) => {
				setResult(response.data);
			})
			.then(() => {
				window.location.href = "/contacts";
			}).catch((error) => {
				errorToast();
			});
	};

	return (
		<FormContainer>
			<h1>Entrar</h1>
			<FormStyle onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">Email*</label>
				<input type="text" id="email" {...register("email")} />
				{errors.email && <p>{errors.email.message}</p>}

				<label htmlFor="password">Senha*</label>
				<input type="password" id="password" {...register("password")} />
				{errors.password && <p>{errors.password.message}</p>}

				<button type="submit">Login</button>
				<hr />
				<a href="/register">Não tem uma conta? Cadastre-se</a>
			</FormStyle>
		</FormContainer>
	);
}
