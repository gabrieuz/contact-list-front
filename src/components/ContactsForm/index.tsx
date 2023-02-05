import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { FormContainer, FormStyle } from "./styles";

export interface IContactsFormInput {
	email: string;
	fullName: string;
	phone: string;
}

export default function ContactsForm({ setResult }: any) {
	const schema = yup.object({
		email: yup.string().email("E-mail inválido.").required("E-mail obrigatório."),
		fullName: yup.string().required("Nome obrigatório."),
		phone: yup.string().required("Telefone obrigatório."),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IContactsFormInput>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: IContactsFormInput) => {
		api.post("/contacts", data).then((response) => {
			setResult(response.data);
		});
	};

	return (
		<FormContainer>
			<h1>Cadastrar Contato</h1>
			<FormStyle onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">Email*</label>
				<input type="text" id="email" {...register("email")} />
				{errors.email && <p>{errors.email.message}</p>}

				<label htmlFor="fullName">Nome Completo*</label>
				<input type="text" id="fullName" {...register("fullName")} />
				{errors.fullName && <p>{errors.fullName.message}</p>}

				<label htmlFor="phone">Telefone*</label>
				<input type="text" id="phone" {...register("phone")} />
				{errors.phone && <p>{errors.phone.message}</p>}

				<button type="submit">Cadastrar</button>
			</FormStyle>
		</FormContainer>
	);
}
