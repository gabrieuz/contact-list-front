import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { FormContainer, FormStyle } from "./styles";
import { toast, ToastContainer } from "react-toastify";

export interface IUserFormInput {
	email: string;
	password: string;
	fullName: string;
	phone: string;
}

export default function UserForm({ setResult }: any) {

	const sucessToast = () => {
		toast.success("Usuário cadastrado com sucesso!");
	};

	const errorToast = () => {
		toast.error("Erro ao cadastrar usuário!");
	};

	const schema = yup.object({
		email: yup.string().email("E-mail inválido.").required("E-mail obrigatório."),
		password: yup.string().required("Senha obrigatória."),
		fullName: yup.string().required("Nome obrigatório."),
		phone: yup.string().required("Telefone obrigatório."),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserFormInput>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: IUserFormInput) => {

		api.post("/users", data).then((response) => {
			setResult(response.data);
		}).catch((error) => {
			errorToast();
		});

	};

	return (
		<FormContainer>
			<h1>Cadastrar Usuário</h1>
			<FormStyle onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">Email*</label>
				<input type="text" id="email" {...register("email")} />
				{errors.email && <p>{errors.email.message}</p>}

				<label htmlFor="password">Senha*</label>
				<input type="password" id="password" {...register("password")} />
				{errors.password && <p>{errors.password.message}</p>}

				<label htmlFor="fullName">Nome Completo*</label>
				<input type="text" id="fullName" {...register("fullName")} />
				{errors.fullName && <p>{errors.fullName.message}</p>}

				<label htmlFor="phone">Telefone*</label>
				<input type="text" id="phone" {...register("phone")} />
				{errors.phone && <p>{errors.phone.message}</p>}

				<button type="submit">Cadastrar</button>
				<hr />
				<a href="/">Retornar</a>
			</FormStyle>
		</FormContainer>
	);
}
