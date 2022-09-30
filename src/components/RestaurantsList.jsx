const RestaurantsList = ({ restaurants }) => {
	return (
		<div>
			<table className="table w-full">
				<thead>
					<tr>
						<th>List</th>
						<th>Id</th>
						<th>Namn</th>
					</tr>
				</thead>
                
				<tbody>
					{restaurants &&
						restaurants.map((allRestaurants, i) => (
							<tr key={allRestaurants.id}>
								<th>{i + 1}</th>
								<td>{allRestaurants.id}</td>
								<td>{allRestaurants.namn}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default RestaurantsList