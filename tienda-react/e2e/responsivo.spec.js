import { test, expect } from '@playwright/test'
const producto = {id:'torta', nombre:'Torta de chocolate', descripcion:'Torta artesanal', categoria:'Tortas', precio:9000, precioAnterior:10000, stock:5, imagen:'/img/productos/tortaChocolate.jpg', activo:true}
for (const width of [360,768,1024,1440]) {
  test(`Navegación pública sin desborde a ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900})
    await page.route('**/api/v1/productos', route => route.fulfill({json:[producto]}))
    await page.route('**/api/v1/productos/torta', route => route.fulfill({json:producto}))
    for (const ruta of ['/', '/productos', '/productos/torta', '/ofertas','/blog','/blog/1','/blog/2','/nosotros','/contacto','/login','/registro','/carrito','/checkout']) {
      console.log("Comprobando:", ruta, width); await page.goto(ruta)
      if (ruta === '/checkout') { await expect(page.getByText('Para comprar necesitas iniciar sesión.', { exact: false })).toBeVisible() } else { await page.locator('h1,h2').first().waitFor({state:'visible'}) }
      await page.evaluate(() => document.fonts.ready)
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), {message:`Desborde en ${ruta} a ${width}px`}).toBeLessThanOrEqual(1)
    }
    await page.goto('/productos')
    await page.getByRole('button',{name:'Agregar al carrito'}).click()
    await page.goto('/carrito')
    await expect(page.getByText('Torta de chocolate')).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1)
  })
}

