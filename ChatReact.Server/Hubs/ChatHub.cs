using ChatReact.Server.Model;
using Microsoft.AspNetCore.SignalR;
using System.Net;
using System.Xml.Linq;

namespace ChatReact.Server.Hubs
{
	public class ChatHub : Hub
	{
		private readonly IDictionary<string, UserConnection> _connection;

		public ChatHub(IDictionary<string, UserConnection> connection)
		{
			_connection = connection;
		}
		public override Task OnDisconnectedAsync(Exception exception)
		{
			if (_connection.TryGetValue(Context.ConnectionId, out UserConnection con))
			{
				_connection.Remove(Context.ConnectionId);
				Clients.Group(con.ChatRoom).SendAsync("ReceiveMessage", "Admin", $"{con.UserName} has left");

				SendConnectedUser(con.ChatRoom);
			}
			return base.OnDisconnectedAsync(exception);
		}
		public async Task SendMessage(string message)
		{
			if (_connection.TryGetValue(Context.ConnectionId, out UserConnection con))
			{
				await Clients.Group(con.ChatRoom).SendAsync("ReceiveMessage", con.UserName, message);
			}
		}
		public async Task JoinChatRoom(UserConnection con)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, con.ChatRoom);

			_connection[Context.ConnectionId] = con;

			await SendConnectedUser(con.ChatRoom);
		}

		public Task SendConnectedUser(string room)
		{
			var user = _connection.Values.Where(c => c.ChatRoom == room).Select(c => c.UserName);

			return Clients.Group(room).SendAsync("UserInRoom", user);
		}
	}
}
