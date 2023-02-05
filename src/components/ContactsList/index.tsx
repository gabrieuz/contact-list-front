import { Container } from "./styles";
import { IContactsFormInput } from "../ContactsForm";

export default function ContactsList({ result }: { result: IContactsFormInput[] }) {
	return (
		<Container>
			<h1>Lista de Contatos</h1>

			{
				result.length > 0 ? (
					<ul>
						{result.map((contact) => (
							<li key={contact.email}>
								<p>{contact.email}</p>
								<p>{contact.fullName}</p>
								<p>{contact.phone}</p>
							</li>
						))}
					</ul>
				) : (
					<p>Nenhum contato cadastrado.</p>
				)
			}

	

		</Container>
	);
}
