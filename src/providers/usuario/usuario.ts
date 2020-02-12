import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable()
export class UsuarioProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');
  }

buscarNoticias() {
    return new Promise((resolve) => {
      this.http.get('http://psymed.atwebpages.com/api/list-news.php').subscribe(
        (data) => {
          resolve(data)
        },
        (err) => {
          console.error(err)
        },
      )
    })
  }

buscarlocal() {
    return new Promise((resolve) => {
      this.http.get('http://localhost/psymed/api/list-places.php').subscribe(
        (data) => {
          resolve(data)
        },
        (err) => {
          console.error(err)
        },
      )
    })
  }

  cadastrarUsuario(
    nome,
    email,
    senha,
    endereco,
    telefone,
    cpf,
  ) {

    let data = JSON.stringify({
      nome: nome,
      email: email,
      senha: senha,
      endereco: endereco,
      telefone: telefone,
      cpf: cpf
    });

        
    let url = `http://localhost/psymed/api/create-user.php?nome=${nome}&email=${email}&senha=${endereco}&telefone=${telefone}&cpf=${cpf}&endereco=${endereco}&token=aushfmsakncs`

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }



  
  buscarpsicologo() {
    return new Promise((resolve) => {
      this.http.get('http://localhost/psymed/api/list-psicologos.php').subscribe(
        (data) => {
          resolve(data)
        },
        (err) => {
          console.error(err)
        },
      )
    })
  }
  
  buscarusers(email, senha) {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost/psymed/api/list-users.php?email=${email}&senha=${senha}`).subscribe(
        (data) => {
          resolve(data)
        },
        (err) => {
          console.error(err)
          reject(err);
        },
      )
    })
  }
 
buscarUserGithub(user) {
  return new Promise((resolve) => {
    this.http.get('https://api.github.com/users/${user}').subscribe(
      (data) => {
        resolve(data)
      },
      (err) => {
        console.error(err)
      },
    )
  })
}


}
