import Image from 'react-bootstrap/Image'

const UserList = ({ users }) => {
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
					{users &&
						users.map((allUsers, i) => (
							<tr key={allUsers.id}>
								<th>{i + 1}</th>
								<td>{allUsers.id}</td>
								<td>{allUsers.email}</td>
								<td><Image src={allUsers.photoURL} height={50} width={50} fluid roundedCircle /></td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserList