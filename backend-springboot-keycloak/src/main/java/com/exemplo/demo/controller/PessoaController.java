package com.exemplo.demo.controller;

import com.exemplo.demo.model.Pessoa;
import com.exemplo.demo.repo.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/pessoas")
@CrossOrigin(origins = "http://localhost:5173") // <--- esta linha resolve o CORS
public class PessoaController {

    @Autowired
    private PessoaRepository repo;

    @GetMapping
    public List<Pessoa> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Pessoa criar(@RequestBody Pessoa p) {
        return repo.save(p);
    }

    @PutMapping("/{id}")
    public Pessoa atualizar(@PathVariable Long id, @RequestBody Pessoa nova) {
        nova.setId(id);
        return repo.save(nova);
    }

    @PreAuthorize("hasRole('admin')")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id, Authentication auth) {
        System.out.println("Usuário: " + auth.getName());
        auth.getAuthorities().forEach(a -> System.out.println("Papel detectado: " + a.getAuthority()));
        repo.deleteById(id);
    }
}
