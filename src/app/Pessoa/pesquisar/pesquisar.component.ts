import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Pessoa } from 'src/app/Modelo/Pessoa';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {
  pessoas: Pessoa[];
  nome: string;
  idade: number;
  sexo: string;

  constructor(private serviceService: ServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.PesquisarPessoasNome();
  }

  PesquisarPessoasNome() {
    this.serviceService.pesquisarNome({ nome: this.nome })
      .then(pessoas => this.pessoas = pessoas);
  }

  PesquisarPessoasIdade() {
    this.serviceService.pesquisarIdade({ idade: this.idade })
      .then(pessoas => this.pessoas = pessoas);
  }

  PesquisarPessoasSexo() {
    this.serviceService.pesquisarSexo({ sexo: this.sexo })
      .then(pessoas => this.pessoas = pessoas);
  }

  Editar(pessoa: Pessoa): void {
    localStorage.setItem("id", pessoa.id.toString());
    this.router.navigate(["editar"]);
  }

  Deletar(pessoa: Pessoa) {
    this.serviceService.deletarPessoas(pessoa)
      .subscribe(data => {
        this.pessoas = this.pessoas.filter(p => p !== pessoa);
        this.toastr.success(pessoa.nome + ' foi Excluído(a) com Sucesso !');
      })
  }

}
