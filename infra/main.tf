provider "aws" {
  region = "us-east-1" # Change to your region if you are not in us-east-1 (N. Virginia)
}

# Dynamically grab the latest Ubuntu 22.04 AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_security_group" "neuro_sg" {
  name        = "neurobalance-sg"
  description = "Allow all necessary ports for the DevOps stack"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Frontend"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend API"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Jenkins"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Grafana"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Custom App Port (14641)"
    from_port   = 14641
    to_port     = 14641
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "neuro_server" {
  ami           = data.aws_ami.ubuntu.id
  # For a "no-cost if eligible" AWS Free Tier demo you can use: t2.micro
  # If you specifically want 1GB RAM on newer gen (paid): t3.micro
  instance_type = "t2.micro"
  
  key_name      = "jenkins-key" 
  
  vpc_security_group_ids = [aws_security_group.neuro_sg.id]

  tags = {
    Name = "NeuroBalance-DevOps-Server"
  }
}

output "server_public_ip" {
  value = aws_instance.neuro_server.public_ip
}
