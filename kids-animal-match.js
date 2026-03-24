<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animal Match Game | Speak Ghana</title>
    <meta name="description" content="Fun animal matching game to learn Twi animal names. Match the picture to the Twi word!">
    
    <!-- ABSOLUTE URL FAVICON -->
    <link rel="icon" type="image/x-icon" href="https://speak-ghana.speakghana912.workers.dev/favicon.ico">
    <link rel="shortcut icon" href="https://speak-ghana.speakghana912.workers.dev/favicon.ico" type="image/x-icon">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZXFR0LFLH6"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZXFR0LFLH6');
    </script>
    
    <!-- Sound Effects -->
    <script src="sound-effects.js"></script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        :root {
            --gold: #D4A373;
            --green: #2A9D8F;
            --red: #E76F51;
            --black: #1E1E1E;
            --cream: #FDF8F2;
            --gray: #666666;
            --shadow: rgba(0, 0, 0, 0.08);
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #FDF8F2 0%, #F5E6D3 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .btn {
            display: inline-block;
            padding: 0.9rem 2.2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
        }
        .btn-primary {
            background: linear-gradient(135deg, var(--green), #1f7a6e);
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-3px);
        }
        .btn-outline {
            background: transparent;
            border: 2px solid var(--green);
            color: var(--green);
        }
        .btn-outline:hover {
            background: var(--green);
            color: white;
        }
        .game-container {
            background: white;
            border-radius: 30px;
            padding: 1.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="kids-animal-match"></div>
    </div>
    
    <!-- Animal Match Game Script -->
    <script src="kids-animal-match.js"></script>
    
    <!-- Sound Effects Test (remove after confirming working) -->
    <script>
        // Check if sound effects loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (window.SoundEffects) {
                    console.log('✅ Sound Effects loaded!');
                } else {
                    console.log('❌ Sound Effects NOT loaded - check sound-effects.js path');
                }
            }, 500);
        });
    </script>
</body>
</html>
