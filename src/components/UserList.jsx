import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'

const UserList = ({ users }) => {
	const admin = users.filter(i => i.admin === true)

	return (
			<Table className="table w-full">
				<thead>
					<tr>
						<th>Id</th>
						<th>Email</th>
						<th>Photo</th>
					</tr>
				</thead>
                
				<tbody>
					{admin &&  
						admin.map((allUsers) => (
							<tr key={allUsers.id}>
								<td>{allUsers.id}</td>
								<td>{allUsers.email}</td>
								<td>{allUsers.photoURL ? <Image src={allUsers.photoURL} height={50} width={50} fluid roundedCircle /> : "No picture for you" } </td>
							</tr>
						))}
				</tbody>
			</Table>
	)
}

export default UserList