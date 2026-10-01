from django.db import models

class Cargo(models.Model):
    nome = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    salario_base = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.nome} - {self.departamento}"


class Funcionario(models.Model):
    nome_completo = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=14, unique=True)
    data_admissao = models.DateField()
    ativo = models.BooleanField(default=True)
    cargo = models.ForeignKey(Cargo, on_delete=models.PROTECT, related_name='funcionarios')

    def __str__(self):
        return self.nome_completo