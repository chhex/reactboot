// src/ClientEdit.jsx
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { apiUrl } from './apiBase';

export default function ClientEdit() {
    const [item, setItem] = useState({ id: undefined, name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams(); // 'new' or an actual id

    const loadItem = useCallback(async (_id) => {
        // New-client case
        if (!_id || _id === 'new') {
            setItem({ id: undefined, name: '', email: '' });
            setLoading(false);
            setError(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const path = `clients/${_id}`;
            const res = await fetch(apiUrl(path));
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setItem(data ?? { id: _id, name: '', email: '' });
        } catch (e) {
            console.error(e);
            setError(String(e));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // runs on mount and whenever :id changes
        console.log('Loading item, id:', id);
        loadItem(id);
    }, [id, loadItem]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const method = item.id ? 'PUT' : 'POST';
            const url = apiUrl(`clients${item.id ? `/${item.id}` : ''}`);
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            navigate('/clients', { replace: true });
        } catch (e) {
            console.error(e);
            setError(String(e));
        } finally {
            setLoading(false);
        }
    }, [item, navigate]);

    return (
        <div>
            <Container className="py-3">
                <h2>{item?.id ? 'Edit Client' : 'New Client'}</h2>
                {loading && <p>Loading…</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                <Form onSubmit={handleSubmit} autoComplete="on">
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={item.name || ''}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={item.email || ''}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </FormGroup>

                    <Button color="primary" type="submit" disabled={loading}>Save</Button>{' '}
                    <Button color="secondary" type="button" onClick={() => navigate('/clients')} disabled={loading}>
                        Cancel
                    </Button>
                </Form>
            </Container>
        </div>
    );
}