import { User } from '../../../api/types';
export const mockedUser = {
  userName: 'user',
  password: 'user',
};

export const mockedAdmin = {
  userName: 'admin',
  password: 'admin',
};

export const mockedSuccessUser: User = {
  authentication:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImdpdmVuX25hbWUiOiJNYXplbiIsImZhbWlseV9uYW1lIjoiU2FtaSIsInVzZXJUeXBlIjoiVXNlciIsIm5iZiI6MTczMjgwMDQxMywiZXhwIjoxNzMyODA0MDEzLCJpc3MiOiJodHRwczovL2FwcC1ob3RlbC1yZXNlcnZhdGlvbi13ZWJhcGktdWFlLWRldi0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQifQ.SyZmHMGjsOiLDK_3HhbVhqwlYC04qqEKiHAvA-TqxwI',
  userType: 'User',
};
export const mockedSuccessAdmin: User = {
  authentication:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImdpdmVuX25hbWUiOiJNb2hhbWFkIiwiZmFtaWx5X25hbWUiOiJNaWxoZW0iLCJ1c2VyVHlwZSI6IkFkbWluIiwibmJmIjoxNzMyODE2OTQ4LCJleHAiOjE3MzI4MjA1NDgsImlzcyI6Imh0dHBzOi8vYXBwLWhvdGVsLXJlc2VydmF0aW9uLXdlYmFwaS11YWUtZGV2LTAwMS5henVyZXdlYnNpdGVzLm5ldCJ9.WjiexvHDl1N-S-jBBklrNoCT1WYWfYSjI6VUWFiWOq0',
  userType: 'Admin',
};
