// src/Home.jsx
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

export default function Home() {
  return (
    <div>
      <Container fluid className="py-3">
        <Button color="link" tag={Link} to="/clients">
          Clients
        </Button>
      </Container>
    </div>
  );
}