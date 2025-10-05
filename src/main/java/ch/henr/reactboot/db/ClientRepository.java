package ch.henr.reactboot.db;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.henr.reactboot.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}