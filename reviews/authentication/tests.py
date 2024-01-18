from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

class UserOperationsAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username="admin", password="123admin456")
        self.client.force_authenticate(user=self.user)

    def test_authenticated_user_can_get_account_information(self):
        url = '/auth/account/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_authenticated_user_can_logout(self):
        logout_response = self.client.post("/auth/logout/", {"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTcwMjUzNywiaWF0IjoxNzA1NjE2MTM3LCJqdGkiOiIyNmU5MTM5MTY5N2Q0MmMzYTg3OTNjNTlmNGU5OWIwYiIsInVzZXJfaWQiOjF9.2iVAyLMd3d-qw-5fU64dTfI4oQN3y2If5J6is4EuDOA"})
        self.assertEqual(logout_response.status_code, status.HTTP_205_RESET_CONTENT)
