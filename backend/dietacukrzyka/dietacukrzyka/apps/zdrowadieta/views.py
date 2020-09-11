from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework import permissions, status
from django.contrib.auth.models import User as MainUser


from .models import Client, User
from .serializers import RegistrationSerializer


class RegistrationView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(request.data)
        name = serializer.data.get('name')
        last_name = serializer.data.get('last_name')
        age = serializer.data.get('age')
        login = serializer.data.get('login')
        password = serializer.data.get('password')
        
        if (User.objects.filter(login = login).count() == 0):
            user = MainUser.objects.create_user(username = login, password = password)
            new_user = User(user = user, login = login, password = password)
            new_user.save()

            new_client = Client(user = new_user, name = name, last_name = last_name, age = age)
            new_client.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_409_CONFLICT)
