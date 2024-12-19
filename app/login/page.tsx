import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marvel-dark to-marvel-red/90 p-4">
      <Card className="w-full max-w-md p-8 glass-card animate-fade-in">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your Marvel Comics collection</p>
          </div>
          
          <div className="w-full space-y-4">
            <Button variant="outline" className="w-full hover-card" onClick={() => console.log("Github login")}>
              <Github className="mr-2 h-4 w-4" />
              Continue with Github
            </Button>
            
            <Button variant="outline" className="w-full hover-card" onClick={() => console.log("Google login")}>
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;