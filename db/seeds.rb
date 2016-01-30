# User.destroy_all
#
# demo_user = User.create({
#     email: "DemoUser@gmail.com",
#     password: "password",
#     username: "DemoUser",
#     description: "New York, NY",
#     image: URI.parse('https://s3.amazonaws.com/better-sounds-dev/users/images/000/000/024/original/Cloud.jpg?X-Amz-Date=20160130T010712Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=bde2e3b597810e1f50efb3456dae9d16317a3dabfa6339927b9871f37ff4f016&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D'),
# })
#
# Track.destroy_all
#
# demo_track = Track.create({
#   title: "You Know Me",
#   artist: "Air Traffic Controller",
#   user_id: demo_user.id,
#   audio: URI.parse('https://s3.amazonaws.com/better-sounds-dev/tracks/audios/000/000/009/original/You_Know_Me_-_Air_Traffic_Controller.mp3?X-Amz-Date=20160130T012633Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=0ff5f7397f38aae67d9af2720611ecd3c2455d8eac0066b6973637da40af4ebe&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D')
# })

#
# user1 = User.create!({
#   username: "BigCat",
#   email: "jimmyf@ad.com",
#   password: "password",
#   description: "Not Boston, MA",
#   image: URI.parse('https://s3.amazonaws.com/better-sounds-dev/users/images/000/000/024/original/Cloud.jpg?X-Amz-Date=20160130T010712Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=bde2e3b597810e1f50efb3456dae9d16317a3dabfa6339927b9871f37ff4f016&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D'),
# })
#
# user2 = User.create!({
#   username: "TwoSlice",
#   email: "jackyb@ad.com",
#   password: "password",
#   description: "Lower East Side, NY",
#   image: URI.parse('https://s3.amazonaws.com/better-sounds-dev/users/images/000/000/024/original/Cloud.jpg?X-Amz-Date=20160130T010712Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=bde2e3b597810e1f50efb3456dae9d16317a3dabfa6339927b9871f37ff4f016&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D'),
# })
#
# user3 = User.create!({
#   username: "five2fifteen",
#   email: "teekle@ad.com",
#   password: "password",
#   description: "Upper East Side, NY",
#   image: URI.parse('https://s3.amazonaws.com/better-sounds-dev/users/images/000/000/024/original/Cloud.jpg?X-Amz-Date=20160130T010712Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=bde2e3b597810e1f50efb3456dae9d16317a3dabfa6339927b9871f37ff4f016&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D'),
# })
#
# user4 = User.create!({
#   username: "AfternoonMen",
#   email: "am@am.com",
#   password: "password",
#   description: "New York, NY",
#   image: URI.parse('https://s3.amazonaws.com/better-sounds-dev/users/images/000/000/019/original/AM.png?X-Amz-Date=20160130T012222Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=8d6a496ebe5f8dfb2feab9acd9eaa015b81c7ac4079850d911e5e9bc5cf9eb47&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D')
# })
#
# Track.destroy_all
#
# track1 = Track.create!({
#   title: "Parking Lots and Basements",
#   artist: "Afternoon Men",
#   user_id: user4.id,
#   audio: URI.parse('https://s3.amazonaws.com/better-sounds-dev/tracks/audios/000/000/001/original/Afternoon_Men_Parking_Lots_and_Basements.mp3?X-Amz-Date=20160130T012511Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=50191914f2498fe0b4fc4ebef70f906e41b1a27b7f195d9469ce4285d4cf3643&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D')
# })
#
# track1 = Track.create!({
#   title: "You Know Me",
#   artist: "Air Traffic Controller",
#   user_id: demo.id,
#   audio: URI.parse('https://s3.amazonaws.com/better-sounds-dev/tracks/audios/000/000/009/original/You_Know_Me_-_Air_Traffic_Controller.mp3?X-Amz-Date=20160130T012633Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=0ff5f7397f38aae67d9af2720611ecd3c2455d8eac0066b6973637da40af4ebe&X-Amz-Credential=ASIAJIZYXUAE6FHFXQ2Q/20160130/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMr//////////wEakAJufG/VDVC9Dj%2BQc95oH1e4gwcs2FoFX3A8%2BnaUyZ8OCfxv1/PHXt/U/oHxMf96ymoqQp3LTeH2k96omKYaAj/9nAuDaX8lH%2BC7xm8ZZ/k%2B29PS1spUmXHM2EDYsDo97KgoR7Cc824mW%2BLIVib2cyFPNxujq8qYAxGpLwtbzPQ/4q%2BRRVH6JT52741/4nSLr5osIO1leiHfS0HKEJ247W/NHZAKdD9%2BfjldKnU9XCeOo0u2gtuX6Z7/LGpfTzB%2BSc2ogBX88MGQRKX2SOoCVBgb9aRh0lYzet/Fr1tOUqfr8HsZidPa0K5zI5CoxxABjj07%2BZj5Wf0oheqCPoAetzc9tW5nOZGNxfFaBYjwEncS%2BCD1mLC1BQ%3D%3D')
# })
