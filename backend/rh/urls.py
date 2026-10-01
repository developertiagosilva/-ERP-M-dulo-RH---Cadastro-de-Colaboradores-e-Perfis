from rest_framework.routers import DefaultRouter
from .views import CargoViewSet, FuncionarioViewSet

router = DefaultRouter()
router.register(r'cargos', CargoViewSet, basename='cargo')
router.register(r'funcionarios', FuncionarioViewSet, basename='funcionario')

urlpatterns = router.urls