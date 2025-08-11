    class SimpleTokenizer {
            constructor() {
                // Create mapping for letters, numbers, and common special characters
                this.charToToken = {};
                this.tokenToChar = {};
                
                let tokenId = 1;
                
                // Lowercase letters (a=1, b=2, ..., z=26)
                for (let i = 0; i < 26; i++) {
                    const char = String.fromCharCode(97 + i); // 'a' to 'z'
                    this.charToToken[char] = tokenId;
                    this.tokenToChar[tokenId] = char;
                    tokenId++;
                }
                
                // Uppercase letters (A=27, B=28, ..., Z=52)
                for (let i = 0; i < 26; i++) {
                    const char = String.fromCharCode(65 + i); // 'A' to 'Z'
                    this.charToToken[char] = tokenId;
                    this.tokenToChar[tokenId] = char;
                    tokenId++;
                }
                
                // Numbers (0=53, 1=54, ..., 9=62)
                for (let i = 0; i < 10; i++) {
                    const char = i.toString();
                    this.charToToken[char] = tokenId;
                    this.tokenToChar[tokenId] = char;
                    tokenId++;
                }
                
                // Common special characters
                const specialChars = [' ', '.', ',', '!', '?', ';', ':', '-', '_', 
                                    '@', '#', '$', '%', '&', '*', '(', ')', 
                                    '[', ']', '{', '}', '+', '=', '/', '\\', 
                                    '|', '<', '>', '"', "'"];
                
                for (const char of specialChars) {
                    this.charToToken[char] = tokenId;
                    this.tokenToChar[tokenId] = char;
                    tokenId++;
                }
            }
            
            encode(text) {
                const tokens = [];
                for (const char of text) {
                    if (this.charToToken[char]) {
                        tokens.push(this.charToToken[char]);
                    } else {
                        // Unknown character, use token 0
                        tokens.push(0);
                    }
                }
                return tokens.join(' ');
            }
            
            decode(tokenString) {
                const tokens = tokenString.split(' ').map(t => parseInt(t.trim())).filter(t => !isNaN(t));
                
                let result = '';
                for (const token of tokens) {
                    if (this.tokenToChar[token]) {
                        result += this.tokenToChar[token];
                    } else if (token === 0) {
                        result += '?'; // Unknown character placeholder
                    }
                }
                return result;
            }
            
            getMapping() {
                return this.charToToken;
            }
        }
        function toggleTokenMapping() {
    const tokenMapDiv = document.getElementById('tokenMap');
    const btn = document.getElementById('viewMappingBtn');

    if (tokenMapDiv.style.display === 'none') {
        tokenMapDiv.style.display = 'grid';
        btn.textContent = 'Hide Character Mapping';
    } else {
        tokenMapDiv.style.display = 'none';
        btn.textContent = 'View Character Mapping';
    }
}
        // Initialize tokenizer
        const tokenizer = new SimpleTokenizer();
        
        // Display token mapping
        function displayTokenMapping() {
            const mapping = tokenizer.getMapping();
            const tokenMapDiv = document.getElementById('tokenMap');
            tokenMapDiv.innerHTML = '';
            
            for (const [char, token] of Object.entries(mapping)) {
                const div = document.createElement('div');
                div.className = 'token-item';
                div.innerHTML = `
                    <span class="token-char">'${char}'</span>
                    <span class="token-num">→ ${token}</span>
                `;
                tokenMapDiv.appendChild(div);
            }
        }
        
        function encodeText() {
            const text = document.getElementById('textInput').value;
            const encoded = tokenizer.encode(text);
            
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').innerHTML = `
                <div class="result-item">
                    <span class="result-label">📝 Input:</span>
                    <span class="result-value">"${text}"</span>
                </div>
                <div class="result-item">
                    <span class="result-label">🔢 Encoded:</span>
                    <span class="result-value">${encoded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">✅ Verification:</span>
                    <span class="result-value">"${tokenizer.decode(encoded)}"</span>
                </div>
            `;
        }
        
        function decodeText() {
            const numbers = document.getElementById('numberInput').value;
            const decoded = tokenizer.decode(numbers);
            
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').innerHTML = `
                <div class="result-item">
                    <span class="result-label">🔢 Input:</span>
                    <span class="result-value">${numbers}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">📝 Decoded:</span>
                    <span class="result-value">"${decoded}"</span>
                </div>
                <div class="result-item">
                    <span class="result-label">✅ Verification:</span>
                    <span class="result-value">${tokenizer.encode(decoded)}</span>
                </div>
            `;
        }
        displayTokenMapping();