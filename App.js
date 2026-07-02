import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [fps, setFps] = useState(60);
  const [cpuFreq, setCpuFreq] = useState(2000);
  const [temperature, setTemperature] = useState(45);
  const [showFPS, setShowFPS] = useState(true);
  const [showTemp, setShowTemp] = useState(true);
  const [showCPU, setShowCPU] = useState(true);

  useEffect(() => {
    let interval;
    if (isMonitoring) {
      interval = setInterval(() => {
        setFps(Math.floor(Math.random() * 30) + 50);
        setCpuFreq(Math.floor(Math.random() * 1000) + 1500);
        setTemperature(Math.floor(Math.random() * 20) + 40);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getFPSColor = (fps) => {
    if (fps >= 55) return '#4CAF50';
    if (fps >= 40) return '#FFC107';
    return '#F44336';
  };

  const getTempColor = (temp) => {
    if (temp < 60) return '#4CAF50';
    if (temp < 70) return '#FFC107';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎮 游戏性能监控</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>监控选项</Text>
        
        <View style={styles.option}>
          <Text style={styles.optionText}>显示帧率 (FPS)</Text>
          <Switch 
            value={showFPS} 
            onValueChange={setShowFPS}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>显示温度</Text>
          <Switch 
            value={showTemp} 
            onValueChange={setShowTemp}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>显示CPU频率</Text>
          <Switch 
            value={showCPU} 
            onValueChange={setShowCPU}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton, isMonitoring && styles.buttonDisabled]}
          onPress={() => setIsMonitoring(true)}
          disabled={isMonitoring}
        >
          <Text style={styles.buttonText}>🚀 开始监控</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton, !isMonitoring && styles.buttonDisabled]}
          onPress={() => setIsMonitoring(false)}
          disabled={!isMonitoring}
        >
          <Text style={styles.buttonText}>⏹️ 停止监控</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          {isMonitoring ? '📊 实时数据' : '⏸️ 等待启动'}
        </Text>
        
        {isMonitoring ? (
          <View style={styles.dataContainer}>
            {showFPS && (
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>帧率:</Text>
                <Text style={[styles.dataValue, { color: getFPSColor(fps) }]}>
                  {fps} FPS
                </Text>
              </View>
            )}
            {showTemp && (
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>温度:</Text>
                <Text style={[styles.dataValue, { color: getTempColor(temperature) }]}>
                  {temperature}°C
                </Text>
              </View>
            )}
            {showCPU && (
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>大核频率:</Text>
                <Text style={styles.dataValue}>
                  {cpuFreq} MHz
                </Text>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.infoText}>
            点击"开始监控"后切换到游戏即可查看实时性能数据
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💡 使用说明</Text>
        <Text style={styles.helpText}>
          1. 选择要显示的监控项{'\n'}
          2. 点击"开始监控"按钮{'\n'}
          3. 切换到游戏开始游玩{'\n'}
          4. 观察性能数据变化{'\n'}
          5. 玩完后点击"停止监控"
        </Text>
        <Text style={styles.noteText}>
          注意: 当前为演示版本，显示模拟数据。完整版需要ROOT权限获取真实系统数据。
        </Text>
      </View>

      <Text style={styles.footer}>
        Game Monitor v1.0 | 针对天玑1100优化
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataContainer: {
    marginTop: 10,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataLabel: {
    fontSize: 16,
    color: '#666',
  },
  dataValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
    marginTop: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
});
