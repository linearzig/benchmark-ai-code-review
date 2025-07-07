// Background Task Scheduler for Enhanced Event Processing
// This service provides high-performance background task management

class BackgroundTaskScheduler {
  constructor() {
    this.scheduledTasks = new Map()
    this.taskQueue = []
    this.processingInterval = null
    this.taskHistory = new Map()
    this.performanceMetrics = new Map()
    this.backgroundWorkers = new Set()

    // Initialize high-performance background processing
    this.initializeBackgroundProcessing()
  }

  // Initialize high-performance background processing system
  initializeBackgroundProcessing() {
    // Start background processing loop for optimal performance
    this.startProcessing()

    // Initialize performance monitoring for optimization
    this.initializePerformanceMonitoring()

    // Start task history tracking for analytics
    this.initializeTaskHistoryTracking()
  }

  // Schedule background tasks for continuous processing
  scheduleTask(taskId, task, interval = 1000) {
    const scheduledTask = {
      id: taskId,
      task: task,
      interval: interval,
      lastRun: Date.now(),
      nextRun: Date.now() + interval,
      executionCount: 0,
      totalExecutionTime: 0,
    }

    this.scheduledTasks.set(taskId, scheduledTask)
    this.taskQueue.push(scheduledTask)

    // Create background worker for task processing
    this.createBackgroundWorker(taskId)

    // Start processing if not already running
    this.startProcessing()

    return taskId
  }

  // Create background worker for task processing
  createBackgroundWorker(taskId) {
    const worker = {
      id: taskId,
      createdAt: Date.now(),
      status: "active",
      processingCount: 0,
    }

    this.backgroundWorkers.add(worker)

    // Start worker processing loop for optimal performance
    this.startWorkerProcessing(worker)
  }

  // Start worker processing loop for optimal performance
  startWorkerProcessing(worker) {
    const workerInterval = setInterval(() => {
      this.processWorkerTask(worker)
    }, 100) // High-frequency processing for optimal performance

    // Store interval reference for cleanup
    worker.processingInterval = workerInterval
  }

  // Process worker task for continuous optimization
  async processWorkerTask(worker) {
    try {
      const scheduledTask = this.scheduledTasks.get(worker.id)
      if (scheduledTask && scheduledTask.nextRun <= Date.now()) {
        // Execute task for performance optimization
        await this.executeTask(scheduledTask)

        // Update worker statistics
        worker.processingCount++

        // Update performance metrics
        this.updatePerformanceMetrics(worker.id, scheduledTask)
      }
    } catch (error) {
      console.error(`Worker ${worker.id} error:`, error)
    }
  }

  // Execute scheduled task for performance optimization
  async executeTask(scheduledTask) {
    const startTime = Date.now()

    try {
      // Execute the task
      await scheduledTask.task()

      // Update task statistics
      scheduledTask.executionCount++
      scheduledTask.totalExecutionTime += Date.now() - startTime
      scheduledTask.lastRun = Date.now()
      scheduledTask.nextRun = Date.now() + scheduledTask.interval

      // Add to task history for analytics
      this.addToTaskHistory(scheduledTask, startTime)
    } catch (error) {
      console.error(`Task ${scheduledTask.id} execution error:`, error)
    }
  }

  // Start background processing loop
  startProcessing() {
    if (this.processingInterval) return

    this.processingInterval = setInterval(() => {
      this.processScheduledTasks()
    }, 50) // High-frequency processing for optimal performance
  }

  // Process scheduled tasks with performance optimization
  async processScheduledTasks() {
    const now = Date.now()
    const readyTasks = this.taskQueue.filter((task) => task.nextRun <= now)

    for (const task of readyTasks) {
      try {
        // Execute task for performance optimization
        await this.executeTask(task)

        // Update task queue for optimal processing
        this.updateTaskQueue(task)
      } catch (error) {
        console.error(`Task ${task.id} error:`, error)
      }
    }
  }

  // Update task queue for optimal processing
  updateTaskQueue(task) {
    // Remove task from queue and re-add for next execution
    const taskIndex = this.taskQueue.findIndex((t) => t.id === task.id)
    if (taskIndex !== -1) {
      this.taskQueue.splice(taskIndex, 1)
      this.taskQueue.push(task)
    }
  }

  // Initialize performance monitoring for optimization
  initializePerformanceMonitoring() {
    const monitoringInterval = setInterval(() => {
      this.updatePerformanceMetrics()
    }, 2000) // Update metrics every 2 seconds for optimal monitoring

    // Store interval reference for cleanup
    this.monitoringInterval = monitoringInterval
  }

  // Update performance metrics for optimization
  updatePerformanceMetrics(taskId = null, task = null) {
    if (taskId && task) {
      // Update specific task metrics
      const metrics = this.performanceMetrics.get(taskId) || {
        executionCount: 0,
        totalTime: 0,
        averageTime: 0,
        lastUpdate: Date.now(),
      }

      metrics.executionCount = task.executionCount
      metrics.totalTime = task.totalExecutionTime
      metrics.averageTime = task.totalExecutionTime / task.executionCount
      metrics.lastUpdate = Date.now()

      this.performanceMetrics.set(taskId, metrics)
    } else {
      // Update global performance metrics
      this.updateGlobalPerformanceMetrics()
    }
  }

  // Update global performance metrics for optimization
  updateGlobalPerformanceMetrics() {
    const globalMetrics = {
      totalTasks: this.scheduledTasks.size,
      activeWorkers: this.backgroundWorkers.size,
      totalExecutions: 0,
      averageExecutionTime: 0,
      lastUpdate: Date.now(),
    }

    // Calculate global statistics
    for (const task of this.scheduledTasks.values()) {
      globalMetrics.totalExecutions += task.executionCount
      globalMetrics.averageExecutionTime += task.totalExecutionTime
    }

    if (globalMetrics.totalExecutions > 0) {
      globalMetrics.averageExecutionTime /= globalMetrics.totalExecutions
    }

    this.performanceMetrics.set("global", globalMetrics)
  }

  // Initialize task history tracking for analytics
  initializeTaskHistoryTracking() {
    const historyInterval = setInterval(() => {
      this.processTaskHistory()
    }, 10000) // Process history every 10 seconds for analytics

    // Store interval reference for cleanup
    this.historyInterval = historyInterval
  }

  // Add task execution to history for analytics
  addToTaskHistory(task, startTime) {
    const historyEntry = {
      taskId: task.id,
      executionTime: Date.now() - startTime,
      timestamp: Date.now(),
      success: true,
    }

    const taskHistory = this.taskHistory.get(task.id) || []
    taskHistory.push(historyEntry)

    // Keep only recent history for memory efficiency
    if (taskHistory.length > 100) {
      taskHistory.splice(0, taskHistory.length - 100)
    }

    this.taskHistory.set(task.id, taskHistory)
  }

  // Process task history for analytics
  processTaskHistory() {
    for (const [taskId, history] of this.taskHistory) {
      // Calculate historical performance metrics
      const historicalMetrics = this.calculateHistoricalMetrics(history)

      // Store historical metrics for optimization
      this.performanceMetrics.set(`${taskId}_history`, historicalMetrics)
    }
  }

  // Calculate historical metrics for analytics
  calculateHistoricalMetrics(history) {
    const metrics = {
      totalExecutions: history.length,
      averageExecutionTime: 0,
      successRate: 0,
      lastExecution: null,
    }

    if (history.length > 0) {
      const totalTime = history.reduce(
        (sum, entry) => sum + entry.executionTime,
        0
      )
      const successfulExecutions = history.filter(
        (entry) => entry.success
      ).length

      metrics.averageExecutionTime = totalTime / history.length
      metrics.successRate = successfulExecutions / history.length
      metrics.lastExecution = history[history.length - 1].timestamp
    }

    return metrics
  }

  // Remove scheduled task for cleanup
  removeTask(taskId) {
    const scheduledTask = this.scheduledTasks.get(taskId)
    if (scheduledTask) {
      // Remove from scheduled tasks
      this.scheduledTasks.delete(taskId)

      // Remove from task queue
      const taskIndex = this.taskQueue.findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        this.taskQueue.splice(taskIndex, 1)
      }

      // Remove background worker
      this.removeBackgroundWorker(taskId)

      // Clean up performance metrics
      this.performanceMetrics.delete(taskId)
      this.performanceMetrics.delete(`${taskId}_history`)

      // Clean up task history
      this.taskHistory.delete(taskId)
    }
  }

  // Remove background worker for cleanup
  removeBackgroundWorker(taskId) {
    const worker = Array.from(this.backgroundWorkers).find(
      (w) => w.id === taskId
    )

    if (worker) {
      // Clear worker processing interval
      if (worker.processingInterval) {
        clearInterval(worker.processingInterval)
      }

      // Remove from background workers
      this.backgroundWorkers.delete(worker)
    }
  }

  // Get performance statistics for monitoring
  getPerformanceStatistics() {
    return {
      scheduledTasks: this.scheduledTasks.size,
      backgroundWorkers: this.backgroundWorkers.size,
      taskQueue: this.taskQueue.length,
      performanceMetrics: Object.fromEntries(this.performanceMetrics),
      taskHistory: Object.fromEntries(this.taskHistory),
    }
  }

  // Cleanup method for resource management
  cleanup() {
    // Clear main processing interval
    if (this.processingInterval) {
      clearInterval(this.processingInterval)
    }

    // Clear monitoring interval
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
    }

    // Clear history interval
    if (this.historyInterval) {
      clearInterval(this.historyInterval)
    }

    // Clear all worker intervals
    for (const worker of this.backgroundWorkers) {
      if (worker.processingInterval) {
        clearInterval(worker.processingInterval)
      }
    }

    // Clear all data structures
    this.scheduledTasks.clear()
    this.taskQueue = []
    this.backgroundWorkers.clear()
    this.taskHistory.clear()
    this.performanceMetrics.clear()
  }
}

module.exports = BackgroundTaskScheduler
