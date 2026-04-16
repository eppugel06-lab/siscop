import os
import sys

def build_domain(domain_name, raw_content):
    base_dir = os.path.join("..", "..", "_domains", domain_name)
    os.makedirs(base_dir, exist_ok=True)
    
    files = {
        "concepts.md": f"# Conceptos Clave de {domain_name}\n\n",
        "rules.md": f"# Reglas de {domain_name}\n\n",
        "glossary.md": f"# Glosario de {domain_name}\n\n",
        "constraints.md": f"# Restricciones de {domain_name}\n\n"
    }

    for filename, content in files.items():
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

    print(f"[{domain_name}] Domain structures successfully built in {base_dir}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python build_domain.py <domain_name>")
        sys.exit(1)
        
    build_domain(sys.argv[1], "")
