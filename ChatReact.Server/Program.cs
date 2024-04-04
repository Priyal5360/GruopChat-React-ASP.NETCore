using ChatReact.Server.Hubs;
using ChatReact.Server.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
	options.AddPolicy("chatreact", builder =>
	{
		builder.WithOrigins("https://localhost:5173")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());

var app = builder.Build();


app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

// CORS middleware should be placed here

app.UseAuthorization();

app.MapControllers();

app.UseCors("chatreact");

app.MapHub<ChatHub>("/chatHub");

app.Run();
