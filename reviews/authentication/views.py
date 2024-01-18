from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from .serializers import UserSerializer

class RegistrationView(APIView):
    def post(self, request):
        data = request.data
        if data['username'] and data['password']:
            new_user = User.objects.create_user(username=data['username'], password=data['password'])
            new_user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class AccountInformation(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        account = request.user
        serializer = UserSerializer(account, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)