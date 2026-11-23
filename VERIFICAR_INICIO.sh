#!/bin/bash

echo "
╔════════════════════════════════════════════════════════════════════════════╗
║                 VERIFICACIÓN DE IMPLEMENTACIÓN DE INICIO                   ║
╚════════════════════════════════════════════════════════════════════════════╝
"

echo "📁 Verificando estructura de carpetas..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check components
COMPONENTS=(
  "src/components/SearchBar.tsx"
  "src/components/CategoryFilter.tsx"
  "src/components/PropertyCard.tsx"
  "src/components/PropertyGrid.tsx"
  "src/components/PropertyCarousel.tsx"
  "src/components/BottomNavigation.tsx"
  "src/components/index.ts"
)

for comp in "${COMPONENTS[@]}"; do
  if [ -f "$comp" ]; then
    echo "✅ $comp"
  else
    echo "❌ $comp (MISSING)"
  fi
done

echo ""
echo "📦 Verificando archivos de datos y tipos..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for file in "src/lib/mockData.ts" "src/types/index.ts" "src/app/page.tsx"; do
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    echo "✅ $file ($lines líneas)"
  else
    echo "❌ $file (MISSING)"
  fi
done

echo ""
echo "🔍 Verificando build..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if npm run build 2>&1 | grep -q "Compiled successfully"; then
  echo "✅ Build exitoso"
else
  echo "❌ Build falló"
fi

echo ""
echo "🌐 Verificando servidor dev..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if ps aux | grep -q "next dev"; then
  echo "✅ Servidor dev corriendo"
else
  echo "⚠️  Servidor dev no detectado (run: npm run dev)"
fi

echo ""
echo "📊 Conteo de líneas..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

total=0
for comp in "${COMPONENTS[@]:0:6}"; do
  if [ -f "$comp" ]; then
    lines=$(wc -l < "$comp")
    total=$((total + lines))
    printf "%-35s %3d líneas\n" "$comp" "$lines"
  fi
done
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "%-35s %3d líneas (total componentes)\n" "" "$total"

echo ""
echo "✅ Verificación completada"
echo ""
echo "Para ver la página en acción:"
echo "  $ npm run dev"
echo "  Abre http://localhost:3000 en tu navegador"
echo ""
