import {Container} from 'react-bootstrap'
import useStreamCollection from '../hooks/useStreamCollection'
import {orderBy} from 'firebase/firestore'
import TipsList from '../components/TipsList'

const TipsPage = () => {
	const {data, loading} = useStreamCollection('tips', orderBy('created'))
	
	return (
		<Container>
			<h1>Alla tips</h1>
			{loading && (<p>Laddar in tips...</p>)}
			{!loading && data && ( <TipsList tips={data} />)}
		</Container>
	)
}

export default TipsPage
