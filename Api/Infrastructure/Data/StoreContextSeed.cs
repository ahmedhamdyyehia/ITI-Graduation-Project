using Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(WebDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<LinkedList<ProductBrand>>(brandsData);

                    foreach (var brand in brands)
                    {
                        // context gonna track everything we add into Product Brands
                        context.ProductBrands.Add(brand);
                    }

                    await context.SaveChangesAsync();

                }

                if (!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<LinkedList<ProductType>>(typesData);

                    foreach (var type in types)
                    {
                        // context gonna track everything we add into Product types
                        context.ProductTypes.Add(type);
                    }

                    await context.SaveChangesAsync();

                }
                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<LinkedList<Products>>(productsData);

                    foreach (var product in products)
                    {
                        // context gonna track everything we add into Products
                    }

                    await context.SaveChangesAsync();

                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message); //  we are passing the message from the Exception
            }
        }


    }
}
