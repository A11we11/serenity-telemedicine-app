import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { PatientDashboard } from "@/pages/patient/DashboardPage";
// import { DoctorDashboard } from "@/pages/doctor/dashboard-page";
import { NewConsultationPage } from "@/pages/patient/NewConsultationPage";
import { ConsultationDetailPage } from "@/pages/patient/ConsultationDetailPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RegisterPage } from "@/pages/auth/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <Navigate to="/dashboard" replace />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <PatientDashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/consultations/new",
    element: (
      <ProtectedRoute>
        <Layout>
          <NewConsultationPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/consultations/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <ConsultationDetailPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

/* 
// src/app/Router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { PatientDashboard } from "@/pages/patient/PatientDashboard";
import { NewConsultationPage } from "@/pages/patient/NewConsultationPage";
import { ConsultationDetailPage } from "@/pages/patient/ConsultationDetailPage";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <div />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <PatientDashboard />,
      },
      {
        path: "consultations/new",
        element: <NewConsultationPage />,
      },
      {
        path: "consultations/:id",
        element: <ConsultationDetailPage />,
      },
      {
        path: "consultations",
        element: <div>Consultations List Page</div>,
      },
      {
        path: "messages",
        element: <div>Messages Page</div>,
      },
      {
        path: "appointments",
        element: <div>Appointments Page</div>,
      },
      {
        path: "photos",
        element: <div>Photo Comparison Page</div>,
      },
      {
        path: "settings",
        element: <div>Settings Page</div>,
      },
    ],
  },
]); */
