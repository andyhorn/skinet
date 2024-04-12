using Microsoft.OpenApi.Models;

namespace API.Extensions
{
  public static class SwaggerServiceExtensions
  {
    private static readonly string[] SecuritySchema = ["Bearer"];

    public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
    {
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen(c =>
      {
        var securitySchema = new OpenApiSecurityScheme()
        {
          Description = "JWT Auth Bearer Scheme",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.Http,
          Scheme = "Bearer",
          Reference = new OpenApiReference()
          {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
          }
        };

        c.AddSecurityDefinition("Bearer", securitySchema);

        var securityRequirement = new OpenApiSecurityRequirement()
        {
            {
                securitySchema, SecuritySchema
            }
        };

        c.AddSecurityRequirement(securityRequirement);
      });

      return services;
    }

    public static IApplicationBuilder UseSwaggerDocumentation(
      this IApplicationBuilder app,
      bool isDevelopment)
    {
      // Configure the HTTP request pipeline.
      if (isDevelopment)
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      return app;
    }
  }
}