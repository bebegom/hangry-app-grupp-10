import Image from 'react-bootstrap/Image'

const UserList = ({ users }) => {
	const admin = users.filter(i => i.admin === true)

	return (
		<div>
			<table className="table w-full">
				<thead>
					<tr>
						<th>List</th>
						<th>Id</th>
						<th>Email</th>
						<th>Photo</th>
					</tr>
				</thead>
                
				<tbody>
					{admin &&  
						admin.map((allUsers, i) => (
							<tr key={allUsers.id}>
								<th>{i + 1}</th>
								<td>{allUsers.id}</td>
								<td>{allUsers.email}</td>
								<td>{allUsers.photoURL ? <Image src={allUsers.photoURL} height={50} width={50} fluid roundedCircle /> : "No picture for you" } </td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserList