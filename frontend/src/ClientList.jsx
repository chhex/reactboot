// src/ClientList.jsx
import { useEffect, useState, useCallback } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { apiUrl } from './apiBase';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // load once on mount
  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetch(apiUrl('clients'));
        const data = await res.json();
        if (!ignore) {
          setClients(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to load clients', e);
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true; };
  }, []);

  const remove = useCallback(async (id) => {
    try {
      await fetch(apiUrl(`clients/${id}`), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      // optimistic update
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      console.error('Delete failed', e);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>

      <Container fluid>
        <div className="float-right">
          <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
        </div>

        <h3>Clients</h3>

        <Table className="mt-4">
          <thead>
            <tr>
              <th width="30%">Name</th>
              <th width="30%">Email</th>
              <th width="40%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      color="primary"
                      tag={Link}
                      to={`/clients/${client.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => remove(client.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}