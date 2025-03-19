import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from "./pages/LandingPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ContactUsPage from "./pages/ContactUsPage.jsx"
import { AuthLayout} from './components/index.js'
import AboutPage from "./pages/AboutPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import { Provider } from 'react-redux'
import store from './store/store.js'
import FAQManager from './pages/FAQManager.jsx'
import ChatbotDemo from './pages/ChatBotDemo.jsx'
import Chatbot from './pages/ChatBot.jsx'
import EmbedChatbot from './pages/EmbedChatbot.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <LandingPage />,
        },
        {
            path: "/about",
            element: <AboutPage/>,
        },
        {
            path: "/login",
            element:(
                <AuthLayout authentication={false}>
                    <LoginPage />
                </AuthLayout>
            ) 
        },
        {
            path: "/dashboard",
            element:(
                <AuthLayout authentication>
                    <Dashboard />
                </AuthLayout>
            ) 
        },
        {
            path: "/faq-manager",
            element:(
                <AuthLayout authentication>
                    <FAQManager />
                </AuthLayout>
            ) 
        },
        {
            path: "/chatbot-demo",
            element:(
                <AuthLayout authentication>
                    <ChatbotDemo />
                </AuthLayout>
            ) 
        },
        {
            path: "/embed-chatbot",
            element:(
                <AuthLayout authentication>
                    <EmbedChatbot />
                </AuthLayout>
            ) 
        },
        {
            path: "/signup",
            element:(
                <AuthLayout authentication={false}>
                    <SignUpPage />
                </AuthLayout>
            ) 
        },
        {
            path: "/contact",
            element: <ContactUsPage />,
        },
    ],
},
{
    path: "/chatbot",
    element:<Chatbot />
},
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
