from rest_framework import viewsets
from .models import Cargo, Funcionario
from .serializers import CargoSerializer, FuncionarioSerializer

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer


class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all().select_related('cargo')
    serializer_class = FuncionarioSerializer