from rest_framework import serializers
from .models import Cargo, Funcionario

class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'


class FuncionarioSerializer(serializers.ModelSerializer):
    # Exibe os detalhes do cargo na leitura (JSON), em vez de apenas o ID
    cargo_detalhes = CargoSerializer(source='cargo', read_only=True)

    class Meta:
        model = Funcionario
        fields = [
            'id', 
            'nome_completo', 
            'email', 
            'cpf', 
            'data_admissao', 
            'ativo', 
            'cargo', 
            'cargo_detalhes'
        ]